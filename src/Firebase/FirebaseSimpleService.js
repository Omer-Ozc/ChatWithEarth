import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment';

export default class FirebaseSimpleSerivce {

    static setOnlineMethod() {
        const userId = auth().currentUser.uid;
        const reference = database().ref(`/onlineUsers/${userId}`);
        // Set the /users/:userId value to true
        reference.set(true).then(() => console.log('Online presence set'));
    }

    static setRegisterMethod(userName, userLastName, userAge) {
       
       

        const userId = auth().currentUser.uid;
        const reference = database().ref(`/Users/${userId}`)
        reference.set(
            {
                name: userName,
                lastName: userLastName,
                age: userAge,
            }
        ).then(() => console.log('Data set is success'))
    }

    static setSendMessage(messageFrom, txtMessage) {

        var date = moment()
        .utcOffset('+03:00')
        .format('YYYY-MM-DDTHH:mm:ssZ');

        console.log(date)
        let fromMe = 'fromMe_'
        let fromChat = 'fromChat_'

        const userId = auth().currentUser.uid;
        const reference = database().ref(`/Users/${userId}/messages/${messageFrom}`)
        const referenceFromTo = database().ref(`/Users/${messageFrom}/messages/${userId}`)
        reference.update({
            [`${date}_fromMe`]: txtMessage
        })
        referenceFromTo.update({
            [`${date}_fromChat`]: txtMessage
        })

    }


}