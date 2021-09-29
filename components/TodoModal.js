import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../Colors';

const TodoModal = props => {
  //   const [name, setName] = useState(props.list.name || '');
  //   const [color, setColor] = useState(props.list.color || '#8022D9');
  //   const [todos, setTodos] = useState(props.list.todos || []);
  const [newTodo, setNewTodo] = useState('');

  const list = props.list;
  const taskCount = list.todos.length;
  const completedCount =
    list && list.todos && list.todos.filter(_ => _.completed).length;

  const toggleTodoCompleted = index => {
    let list = props.list;
    list.todos[index].completed = !list.todos[index].completed;
    props.updateList(list);
  };

  const renderItem = ({item, index}) => (
    <View style={styles.todoContainer}>
      <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
        <Ionicons
          name={item.completed ? 'ios-square' : 'ios-square-outline'}
          size={24}
          color={colors.gray}
          style={{width: 32}}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.todo,
          {
            textDecorationLine: item.completed ? 'line-through' : 'none',
            color: item.completed ? colors.gray : colors.black,
          },
        ]}>
        {item.title}
      </Text>
    </View>
  );

  const addTodo = () => {
    let list = props.list;
    list.todos.push({title: newTodo, completed: false});
    props.updateList(list);
    setNewTodo('');
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{position: 'absolute', top: 24, right: 20, zIndex: 10}}
          onPress={() => props.closeModal()}>
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>
        <View
          style={[
            styles.section,
            styles.header,
            {borderBottomColor: list.color},
          ]}>
          <View>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>
        <View style={[styles.section, {flex: 3}]}>
          <FlatList
            data={list.todos}
            keyExtractor={item => item.title}
            renderItem={renderItem}
            contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={[styles.section, styles.footer]} behavior="padding">
          <TextInput
            style={[styles.input, {borderColor: list.color}]}
            onChangeText={text => setNewTodo(text)}
            value={newTodo}
            placeholder="List Name?"
            placeholderTextColor={'#e7e7e7'}
            selectionColor={'#888'}
          />
          <TouchableOpacity
            onPress={() => addTodo()}
            style={[styles.addTodo, {backgroundColor: list.color}]}>
            <AntDesign name="plus" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
    color: '#808080',
    backgroundColor: '#fff',
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todo: {
    color: colors.black,
    fontWeight: '800',
    fontSize: 16,
  },
});

export default TodoModal;
