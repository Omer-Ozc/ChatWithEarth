import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default class FirebaseGetSerivce {

    static getIsUserRegistered = async () => {
        const userId = auth().currentUser.uid;
        console.log("getIsUserRegistered : ", userId)
        let profileObject = ""
        await database()
            .ref(`/Users/${userId}`)
            .once('value')
            .then(snapshot => {
                console.log('User data: ', snapshot.val());
                profileObject = snapshot.val()
            });
        return profileObject
    }



    static getUserAllChat = async (chatUid) => {
        const userId = auth().currentUser.uid;
        let messageObject = []
        await database()
            .ref(`/Users/${userId}/messages/${chatUid}`)
            .once('value')
            .then(snapshot => {
                console.log('User Message Data: ', snapshot.val());
                messageObject = snapshot.val()
            });
        return messageObject
    }


}