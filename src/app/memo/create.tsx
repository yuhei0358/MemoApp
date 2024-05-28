import {
    View, TextInput, StyleSheet, KeyboardAvoidingView, Button
} from 'react-native';
import { router } from 'expo-router';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import CircleButton from '../../components/CircleButton';
import Icon from '../../components/Icon';
import { db } from '../../config';
import { getAuth, signInAnonymously, onAuthStateChanged, deleteUser } from 'firebase/auth';

// サインイン処理
const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    console.log('匿名でサインインしました');
  })
  .catch((error) => {
    console.error('匿名サインインエラー', error);
  });

// ユーザーの状態を監視
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(`サインイン中のUID: ${uid}`);
  } else {
    console.log('サインアウトしました');
  }
});

// メモを追加する関数
const handlePress = (bodyText: string): void => {
    if (auth.currentUser === null) { return; }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    addDoc(ref, {
      bodyText,
      updatedAt: Timestamp.fromDate(new Date())
    })
    .then((docRef) => {
        console.log('成功', docRef.id);
        router.back();
    })
    .catch((error) => {
        console.log(error);
    });
};

// ユーザーを削除する関数
const handleDelete = (): void => {
    const user = auth.currentUser;

    if (user) {
        deleteUser(user).then(() => {
            console.log('ユーザーが削除されました');
        }).catch((error) => {
            console.error('ユーザー削除エラー', error);
        });
    } else {
        console.log('現在サインインしているユーザーはいません');
    }
};

const Create = (): JSX.Element => {
    const [bodyText, setBodyText] = useState('');

    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    style={styles.input}
                    value={bodyText}
                    onChangeText={(text) => { setBodyText(text); }}
                    autoFocus
                />
            </View>
            <CircleButton onPress={() => { handlePress(bodyText); }}>
                <Icon name='check' size={40} color='#ffffff' />
            </CircleButton>
            <Button
                title="ユーザー削除"
                onPress={handleDelete}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24
    }
});

export default Create;
