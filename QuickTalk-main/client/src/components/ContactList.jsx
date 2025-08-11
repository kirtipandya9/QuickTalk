import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store'
import { HOST } from '@/utils/constants';
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar';

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatType,
    setSelectedChatData,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) {
      setSelectedChatType('channel')
    } else {
      setSelectedChatType('contact')
    }

    setSelectedChatData(contact)
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([])
    }
  }

  return (
    <div className='mt-5'>
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 my-2 rounded-2xl transition-all duration-300 cursor-pointer ${selectedChatData && selectedChatData._id === contact._id ? 'bg-purple-500' : 'bg-purple-50'}`}
          onClick={() => handleClick(contact)}
        >
          <div className='flex gap-5 items-center justify-start text-gray-800 font-semibold'>
            {!isChannel && (
              <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                {contact.image ? (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-10 w-32 md:w-48 md:h-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                      contact.color
                    )}`}
                  >
                    {contact.firstName
                      ? contact.firstName.split("").shift()
                      : contact.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            )}
            {isChannel && (
              <div className='bg-purple-200 h-10 w-10 flex items-center justify-center rounded-full'>#</div>
            )}
            {isChannel ? (
              <span className={`${selectedChatData && selectedChatData._id === contact._id ? 'text-white' : ''}`}>
                {contact.name}
              </span>
            ) : (
              <span className={`${selectedChatData && selectedChatData._id === contact._id ? 'text-white' : ''}`}>
                {contact.firstName ? `${contact.firstName} ${contact.lastName}` : contact.email}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContactList
