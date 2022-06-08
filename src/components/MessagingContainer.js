import {React,useState} from 'react'
import {useCookies} from 'react-cookie'
import { Window,ChannelHeader,MessageList,MessageInput,Thread} from 'stream-chat-react'
import UserList from './UserList'
import {FaUsers, FaArrowAltCircleLeft} from 'react-icons/fa'

 function MessagingContainer({users}) {
    const [cookies, setCookies, removeCookies] = useCookies(['user'])
    const [userListVisible, setUserListVisible] = useState(false)

     const logout = () => {
         removeCookies('Name', cookies.Name)
         removeCookies('HashedPassword', cookies.HashedPassword)
         removeCookies('UserId', cookies.UserId)
         removeCookies('AuthToken', cookies.AuthToken)
         window.location.reload()
     }

    return(
        <div className='messaging-container'>
            {!userListVisible && (

                <Window>
                    <FaUsers className='icon' onClick={() => setUserListVisible(true)}/>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                    <button className='standard-button'onClick={logout}>Log Out</button>
                </Window>
            )}

            {userListVisible && (
                <Window>
                    <div className='chat-container'>
                        <FaArrowAltCircleLeft className='icon' onClick={() => setUserListVisible(false)} />
                        <ChannelHeader  title='users'/>
                        <UserList users={users} />
                    </div>
                </Window>
            )}
            
            <Thread />
        </div>
    )
}

export default MessagingContainer;