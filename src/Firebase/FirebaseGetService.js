import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default class FirebaseGetSerivce {

    static getIsUserRegistered = async () => {
        const userId = auth().currentUser.uid;
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


}