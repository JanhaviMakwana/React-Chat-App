import React from 'react';
import FormData from 'form-data';
import ChatService from '../services/ChatService';
import { withState } from '../chat-context';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.state.user,
            chats: [],
            loading: false,
            textMessage: '',
            imageMessage: null
        };
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.fetchChats();
    }

    fetchChats = () => {
        this.setState({ loading: true });
        const chatArea = this.myRef.current;
        ChatService.getChats()
            .then(res => {
                if (res.length > 0) {
                    this.setState({ chats: res })
                    chatArea.scrollBy(0, chatArea.scrollHeight);
                    this.setState({ loading: false })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    formatTime(timestamp) {
        const d = new Date(timestamp);
        const time = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}${d.getHours()}:${d.getMinutes()}`;
        return time;
    }

    handleChange = (event) => {
        if (event.target.name === 'image') {
            this.setState({ imageMessage: event.target.files[0] })
        } else {
            this.setState({ textMessage: event.target.value });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const chatArea = this.myRef.current;
        if (this.state.imageMessage) {
            const image = new FormData();
            image.append('image', this.state.imageMessage);
            ChatService.imageMessage(this.props.state.user.id, image)
                .then(() => {
                    this.fetchChats();
                    chatArea.scrollBy(0, chatArea.scrollHeight);
                    this.setState({ textMessage: '' });
                })
                .catch(err => {
                    console.log(err);
                });

        } else {
            ChatService.textMessage(this.props.state.user.id, { message: this.state.textMessage })
                .then(() => {
                    this.fetchChats();
                    chatArea.scrollBy(0, chatArea.scrollHeight);
                    this.setState({ textMessage: '' });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        const userId = this.props.state.user.id;
        return (
            <div className="chat-screen m-1">
                <section>
                    <div className="chat-area mt-5 d-flex flex-column" ref={this.myRef}>
                        {this.state.loading
                            && <div className="spinner-border text-success" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>}
                        {
                            this.state.chats &&
                            this.state.chats.map((chat, index) => {
                                return <div className="chat-bubble">
                                    {chat.message.startsWith('http')
                                        ? <img className={`chat-image ${chat.userId === userId ? 'current' : 'other'}`} src={chat.message} alt="chat-message" />
                                        : <p className={`chat-text ${chat.userId === userId ? 'current' : 'other'}`} key={index}>
                                            {chat.message}
                                        </p>
                                    }
                                   <div className="px-5 mx-5"> <span className={`chat-time ${chat.userId === userId ? 'current' : 'other'}`}>{this.formatTime(chat.createdAt)}</span></div>
                                </div>
                            })
                        }
                    </div>
                    <div className="chat-input">
                        <form onSubmit={this.handleSubmit} className="form-group d-flex flex-row">
                            <div className="m-3 w-100">
                                <input
                                    className="form-control "
                                    placeholder="type something...."
                                    name="textMessage"
                                    onChange={this.handleChange}
                                    value={this.state.textMessage}

                                />
                            </div>
                            <div className="m-3">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={this.handleChange}
                                    value={this.state.imageMessage}
                                />
                            </div>
                            <div className="m-3">
                                <button type="submit" className="btn btn-block btn-primary px-5">Send</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        Login as: <strong className="text-info">{this.props.state.user.email}</strong>
                    </div>
                </section>
            </div>
        );
    }
}
export default withState(Chat);