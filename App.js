import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from 'react-native';
import colors from './Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {tempData} from './tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';

const App = () => {
  const [addTodoVisible, setAddToVisible] = useState(false);
  const [lists, setLists] = useState(tempData || []);

  const renderItem = ({item}) => (
    <TodoList list={item} updateList={updateList} />
  );

  const toggleAddTodoModal = () => {
    setAddToVisible(!addTodoVisible);
  };

  const addList = list => {
    setLists([...lists, {...list, id: lists.length + 1, todos: []}]);
  };

  const updateList = list => {
    setLists(
      lists.map(item => {
        return item.id == list.id ? list : item;
      }),
    );
  };

  return (
    <View style={styles.container}>
      {/* Todo Modal */}
      <Modal
        animationType="slide"
        visible={addTodoVisible}
        onRequestClose={() => toggleAddTodoModal()}>
        <AddListModal closeModal={toggleAddTodoModal} addList={addList} />
      </Modal>

      {/* Screen */}

      <View style={{flexDirection: 'row'}}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo{' '}
          <Text style={{fontWeight: '300', color: colors.blue}}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View style={{marginVertical: 48}}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => toggleAddTodoModal()}>
          <AntDesign name="plus" size={16} color={colors.blue} />
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text>
      </View>
      <View style={{height: 275, paddingLeft: 32}}>
        <FlatList
          data={lists}
          keyExtractor={item => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});

export default App;
