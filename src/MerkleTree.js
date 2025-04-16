import keccak256 from "keccak256";

export class MerkleTree {
  constructor(leaves) {
    this.leaves = leaves;
    this.hashFunction = keccak256;
    this.tree = this.buildTree(leaves);
  }

  buildTree(leaves) {
    if (leaves.length === 0) return [];
    
    let currentLevel = leaves.map(leaf => this.hashFunction(leaf));
    const tree = [currentLevel];

    while (currentLevel.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        if (i + 1 < currentLevel.length) {
          nextLevel.push(this.hashFunction(currentLevel[i] + currentLevel[i + 1]));
        } else {
          nextLevel.push(currentLevel[i]); // Odd number of nodes, carry the last one up
        }
      }
      tree.push(nextLevel);
      currentLevel = nextLevel;
    }

    return tree;
  }

  getRoot() {
    return this.tree[this.tree.length - 1][0];
  }

  verify(leaf) {
    let leafHash = this.hashFunction(leaf);
    let index = this.leaves.indexOf(leaf);

    if (index === -1) {
      return false;
    }

    for (let i = 0; i < this.tree.length - 1; i++) {
      const level = this.tree[i];
      const isRightNode = index % 2 === 1;
      const pairIndex = isRightNode ? index - 1 : index + 1;

      if (pairIndex < level.length) {
        const pairHash = level[pairIndex];
        if (isRightNode) {
          leafHash = this.hashFunction(pairHash + leafHash);
        } else {
          leafHash = this.hashFunction(leafHash + pairHash);
        }
      }

      index = Math.floor(index / 2);
    }

    return leafHash.equals(this.getRoot());
  }
}