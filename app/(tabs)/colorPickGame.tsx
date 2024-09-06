import { useState, useEffect } from "react";
import {
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Pressable,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Image } from "expo-image";

const getRandomColor = (difference: number) => {
  const red = Math.floor(Math.random() * 250);
  const blue = Math.floor(Math.random() * 250);
  const green = Math.floor(Math.random() * 250);
  const differentColor = `rgb(${red},${blue - difference},${green})`;
  const RandomColor = `rgb(${red},${blue},${green})`;
  return {
    RandomColor: RandomColor,
    differentColor: differentColor,
  };
};
export default function App() {
  const [level, setLevel] = useState<number>(50);
  const [color, setColor] = useState(getRandomColor(level));
  const [score, setScore] = useState<number>(0);
  const [num, setNum] = useState<number>(Math.floor(Math.random() * 10));
  const handlePick = (index: number) => {
    if (index + 1 == num) {
      setScore(score + 1);
      const x = Math.floor(Math.random() * 10);
      alert(x);
      if (x == 0) {
        setNum(9);
      } else {
        setNum(x);
      }

      if (score > 10) {
        setLevel(30);
      } else if (score > 20) {
        setLevel(20);
      } else if (score > 30) {
        setLevel(10);
      } else if (score > 40) {
        setLevel(5);
      }
      setColor(getRandomColor(level));
    } else {
      alert("game over");
      setScore(0);
      setNum(5);
      setLevel(50);
      setColor(getRandomColor(50));
    }
  };
  // useEffect(() => {
  //   const x = Math.random() * 9;
  //   setNum(Math.floor(x));
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>{score}</Text>
      <View style={styles.gameContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
          return (
            <Pressable
              style={{
                ...styles.square,
                backgroundColor:
                  item == num ? color.differentColor : color.RandomColor,
              }}
              key={index}
              onPress={() => handlePick(index)}
            >
              <Text>{item}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gameContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 310,
    height: 300,
    gap: 2,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
