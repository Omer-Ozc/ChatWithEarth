import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

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

    
}