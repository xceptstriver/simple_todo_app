import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import colors from '../Colors';
import TodoModal from './TodoModal';

const TodoList = props => {
  const list = props.list;
  const completedCount =
    list.todos && list.todos.filter(_ => _.completed).length;
  const remainingCount = list.todos.length - completedCount;

  //   stateHandling;
  const [showListVisible, setShowListVisible] = useState(false);
  const toggleListModal = () => {
    setShowListVisible(!showListVisible);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={showListVisible}
        onRequestClose={() => toggleListModal()}>
        <TodoModal
          list={list}
          closeModal={toggleListModal}
          updateList={props.updateList}
        />
      </Modal>

      <TouchableOpacity
        onPress={() => toggleListModal()}
        style={[styles.listContainer, {backgroundColor: list.color}]}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
        <View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subTitle}>Remaining</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subTitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: colors.white,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});

export default TodoList;
