const Chat = require('../models/chat')
const Messages = require('../models/message')

class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginate(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page-1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}
const messageCtrl = {
    createMessage: async(req, res) => {
        try {
            const {sender, recipient, text, media, call} = req.body

            if(!recipient || (!text.trim() && media.length === 0 && !call)) return;

            const newConversation = await Chat.findOneAndUpdate({
                $or: [
                    {recipients: [sender,recipient]},
                    {recipients: [recipient,sender]}
                ]
            }, {
                recipients: [sender,recipient],
                text,media,call
            },{new: true, upsert: true})

            const newMessage = new Messages({
                chat: newConversation._id,
                sender, call,
                recipient, text, media
            })
            
            await newMessage.save()

            res.json({msg: 'Msg Created.'})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getChat: async (req, res) => {
        try {
            const features = new APIfeatures(Chat.find({
                recipients: req.user._id
            }),req.query).paginate()

            const chats = await features.query.sort('-updatedAt')
            .populate('recipients','avatar name username')

            res.json({
                chats,
                result: chats.length
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getMessage: async (req, res) => {
        try {
            const features = new APIfeatures(Messages.find({
                $or: [
                    {sender: req.user._id, recipient: req.params.id},
                    {sender: req.params.id, recipient: req.user._id}
                ]
            }),req.query).paginate()

            const messages = await features.query.sort('-createdAt')

            res.json({
                messages,
                result: messages.length
            })
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    deleteMessage: async (req, res) => {
        try {
            await Messages.findOneAndDelete({_id: req.params.id, sender: req.user._id})
            res.json({msg: 'Delete Success'})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    deleteChat: async (req, res) => {
        try {
            const newChat = await Chat.findOneAndDelete({
                $or: [
                    {recipients: [req.user._id, req.params.id]},
                    {recipients: [req.params.id, req.user._id]}
                ]
            })
            await Messages.deleteMany({chat: newChat._id})
            
            res.json({msg: 'Delete Success'})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = messageCtrl