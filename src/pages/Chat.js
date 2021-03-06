import React from 'react';
import Header from '../components/Header';
import { auth, db } from '../services/firebase';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null,
            loadingChats: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
    }

    async componentDidMount() {
        this.setState({ readError: null, loadingChats: true });
        const chatArea = this.myRef.current;
        try {
            db.ref('chats').on("value", snapshot => {
                let fetchedChats = [];
                // console.log(fetchedChats);
                snapshot.forEach((snap) => {
                    // console.log(snap.val());
                    fetchedChats.push(snap.val());
                });
                fetchedChats.sort((a, b) => { return a.timestamp - b.timestamp })
                this.setState({ chats: fetchedChats });
                chatArea.scrollBy(0, chatArea.scrollHeight);
                this.setState({ loadingChats: false })
            });
        } catch (error) {
            this.setState({ readError: error.message, loadingChats: false });
        }
    }

    handleChange = (event) => {
        this.setState({ content: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef.current;
        try {
            await db.ref('chats').push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid
            });
            this.setState({ content: '' });
            chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    formatTime(timestamp) {
        const d = new Date(timestamp);
        const time = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}${d.getHours()}:${d.getMinutes()}`;
        return time;
    }


    render() {
        console.log(this.state.user.uid);

        return (
            <div>
                <Header />
                <div className="chat-area" ref={this.myRef}>

                    {
                        this.state.loadingChats ? <div className="spinner-border text-success" role="status">
                            <span className="sr-only">Loading...</span>
                        </div> : ""
                    }

                    {this.state.chats ? this.state.chats.map(chat => {
                        console.log(chat.id);
                        return <p key={chat.timestamp} className={'chat-bubble ' + (this.state.user.uid === chat.uid ? 'current-user' : "")}>
                            {chat.content}
                            <br />
                            <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
                        </p>
                    }) : null}
                </div>
                <form onSubmit={this.handleSubmit} className="mx-3">
                    <input
                        className="message form-control"
                        name="content"
                        onChange={this.handleChange}
                        value={this.state.content}
                    />
                    {this.state.writeError ? <p className="text-danger">{this.state.writeError}</p> : null}
                    <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
                </form>
                <div className="py-5 mx-3">
                    Login as: <strong className="text-info">{this.state.user.email}</strong>
                </div>
            </div>
        );
    }
};

export default Chat;