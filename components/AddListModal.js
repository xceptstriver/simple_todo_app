import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../Colors';
import {tempData} from '../tempData';

const AddListModal = props => {
  const backgroundColors = [
    '#5CD859',
    '#24A6D9',
    '#595BD9',
    '#8022D9',
    '#D159D8',
    '#D85963',
    '#D88559',
  ];
  const [name, setName] = useState('');
  const [color, setColor] = useState(backgroundColors[0]);

  const renderColors = () => {
    return (
      backgroundColors &&
      backgroundColors.map((_, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.colorSelect, {backgroundColor: _}]}
          onPress={() => setColor(_)}></TouchableOpacity>
      ))
    );
  };

  const createTodo = () => {
    const list = {
      name,
      color,
    };
    props.addList(list);
    setName('');
    props.closeModal();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{position: 'absolute', top: 24, right: 20}}
        onPress={() => props.closeModal()}>
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>

      <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
        <Text style={styles.title}>Create Todo List</Text>
        <TextInput
          style={styles.input}
          placeholder="List Name?"
          placeholderTextColor={'#e7e7e7'}
          onChangeText={text => setName(text)}
          value={name}
          selectionColor={'#888'}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          {renderColors()}
        </View>
        <TouchableOpacity
          style={[styles.create, {backgroundColor: color}]}
          onPress={() => createTodo()}>
          <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 20}}>
            Create!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#808080',
    backgroundColor: '#fff',
  },

  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

export default AddListModal;
