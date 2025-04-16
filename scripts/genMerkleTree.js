import {MerkleTree} from "../src/MerkleTree.js";


async function main () {
  const leaves = ['a', 'b', 'c']
  console.log('Leaves:', leaves);

  const merkleTree = new MerkleTree(leaves);
  const root = merkleTree.getRoot();
  console.log('Merkle Tree Root:', root.toString('hex'));

  const valid = merkleTree.verify('b');
  console.log('Is "b" a valid leaf?', valid);
  const invalid = merkleTree.verify('d');
  console.log('Is "d" a valid leaf?', invalid); // Should throw an error since 'd' is not in the leaves

}   

main();
