import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';


export default class FirebaseGetSerivce {

    static getIsUserRegistered = async () => {
        const userId = auth().currentUser.uid;
        console.log("getIsUserRegistered : ", userId)
        let profileObject = ""
        await database()
            .ref(`/Users/${userId}`)
            .once('value')
            .then(snapshot => {
                console.log('getIsUserRegistered Fetch Success');
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
                console.log("getUserAllChat Fetch Success");
                messageObject = snapshot.val()
            });
        return messageObject
    }

    //BURANIN ŞUANDA BİR İŞLEVİ YOK 
    static getNewMessage = async (state) => {

        const userId = auth().currentUser.uid;
        let message = []
        const onValueChange = await database()
            .ref(`/Users/${userId}/messages/${this.state.chatWith.uid}`)
            .on('value', snapshot => {
                message = snapshot.val()
                if (JSON.stringify(message) != JSON.stringify(state)) {
                    return message
                    //console.log("Set Stadte" , this.state.chat)
                }
            });
    }

    static getUserAllCoordsAndIsOnline = async () => {
        const userId = auth().currentUser.uid;
        let mapObject = []
        await database()
            .ref(`/onlineUsers/`)
            .once('value')
            .then(snapshot => {
                console.log("getUserAllCoordsAndIsOnline Fetch Success");
                mapObject = snapshot.val()
            });
        return mapObject
    }


    static getUserAllMessageList = async () => {
        const userId = auth().currentUser.uid;
        let messageList = []
        await database()
            .ref(`/Users/${userId}/messages/`)
            .once('value')
            .then(snapshot => {
                console.log("getUserAllMessageList Fetch Success");
                messageList = snapshot.val()
            });
        return messageList
    }

    static getUserImage = async (uid) => {
            const url = await storage()
                .ref(uid)
                .getDownloadURL();
            return url
    }


}