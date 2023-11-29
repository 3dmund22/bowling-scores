type Frame = number[];

function calculateScore(rolls: string): number {
  const frames: Frame[] = [];
  let frame: Frame = [];
  let score = 0;

  for (let i = 0; i < rolls.length; i++) {
    const roll = rolls[i];

    if (roll === "X") {
      frame.push(10);
      frames.push(frame);
      frame = [];
    } else if (roll === "/") {
      frame.push(10 - frame[0]);
      frames.push(frame);
      frame = [];
    } else if (roll === "-") {
      frame.push(0);
      if (frame.length === 2) {
        frames.push(frame);
        frame = [];
      }
    } else {
      const rollScore = parseInt(roll, 10);
      frame.push(rollScore);
      if (frame.length === 2) {
        frames.push(frame);
        frame = [];
      }
    }
  }

  // Calculate score
  for (let j = 0; j < frames.length; j++) {
    const currentFrame = frames[j];
    score += currentFrame.reduce((a, b) => a + b, 0);

    if (currentFrame[0] === 10 && j < frames.length - 1) {
      /**
       * ! Bonus for strike
       */
      const nextFrame = frames[j + 1];

      if (nextFrame[0] === 10 && j < frames.length - 2) {
        /**
         * ! Handle bonus for consecutive strikes
         * */
        const nextNextFrame = frames[j + 2];

        /**
         * ! Does nextNextFrame exist?
         */
        if (nextNextFrame) {
          score += nextFrame[0] + nextNextFrame[0];
        }
      } else {
        score += nextFrame[0] + (nextFrame[1] || 0);
      }
    } else if (
      currentFrame[0] + currentFrame[1] === 10 &&
      j < frames.length - 1
    ) {
      // Handle bonus for spare
      const nextFrame = frames[j + 1];

      /**
       * ! Does nextNextFrame exist?
       */

      if (nextFrame) {
        score += nextFrame[0];
      }
    }
  }

  return score;
}

module.exports = calculateScore;

console.log(calculateScore("XXXXXXXXXXX")); // 300
console.log(calculateScore("9-9-9-9-9-9-9-9-9-9-")); // 90
console.log(calculateScore("5/5/5/5/5/5/5/5/5/5/5")); // 150
