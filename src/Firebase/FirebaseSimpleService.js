import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment';
import storage from '@react-native-firebase/storage';

export default class FirebaseSimpleSerivce {

    static setOnlineMethod(latitude, longitude) {
      
       // function bekle() {
            const userId = auth().currentUser.uid;
            const reference = database().ref(`/onlineUsers/${userId}`);
            // Set the /users/:userId value to true
            reference.update({
                isOnline: true,
                latitude: latitude,
                longitude: longitude
            }).then(() => console.log('Online presence set'));
       // }

        //setTimeout(bekle, 4000);

        /*
                const userId =  auth().currentUser.uid;
                const reference = database().ref(`/onlineUsers/${userId}`);
                // Set the /users/:userId value to true
                reference.update({
                    isOnline: true,
                    latitude: latitude,
                    longitude: longitude
                }).then(() => console.log('Online presence set'));*/
    }


    static setRegisterMethod = async(userName, userLastName, userAge) => {
        const userId = auth().currentUser.uid;
        const reference = database().ref(`/Users/${userId}`)
        await reference.set(
            {
                name: userName,
                lastName: userLastName,
                age: userAge,
            }
        ).then(() => console.log('Data set is success'))
    }

    static setRegisterMethodForOnlineUsers = async(userName, userLastName, userAge) => {
        const userId = auth().currentUser.uid;
        const reference = database().ref(`/onlineUsers/${userId}`)
        await reference.set(
            {
                name: userName,
                lastName: userLastName,
                age: userAge,
            }
        ).then(() => console.log('Data Online Users is Success'))
        }

    static setSendMessage(messageFrom, txtMessage) {

        var date = moment()
            .utcOffset('+03:00')
            .format('YYYY-MM-DDTHH:mm:ssZ');

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

    static removeAllMessage = async() => {
        const userId = auth().currentUser.uid;
        const reference = database().ref(`/Users/${userId}/messages`)
        await reference.remove().then(() => console.log('Data set is success'))
    }

    static setImage = async(imagePaths) => {
        const userId = auth().currentUser.uid;
        const reference = storage().ref(userId);
        await reference.putFile(imagePaths);
    }

    static setDefaultImage = async(imagePaths) => {
        const userId = auth().currentUser.uid;
        const reference = storage().ref(userId);
        await reference.putFile(imagePaths);
    }


    

    
}