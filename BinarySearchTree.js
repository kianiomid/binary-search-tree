class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            return this.root.value
        } else {
            let currentNode = this.root;
            //find the correct position(node) in the tree and add the node
            while (true) {
                if (value < currentNode.value) { // Left
                    if (!currentNode.left) {
                        currentNode.left = newNode;
                        return this;
                    }
                    currentNode = currentNode.left;

                } else { //Right
                    if (!currentNode.right) {
                        currentNode.right = newNode;
                        return this;
                    }
                    currentNode = currentNode.right;
                }
            }
        }
    }

    lookup(value) {
        if (!this.root) return "root node not found";

        let currentNode = this.root;
        // console.log(currentNode)
        while (true) {
            if (!currentNode) return "doesn't exist in tree!";
            console.log(currentNode.value)
            if (value === currentNode.value) return currentNode.value;
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
    }

    remove(value) {
        if (!this.root) return "root node not found";

        let currentNode = this.root;
        let parentNode = null;
        while (true) {
            // if (value === currentNode.value) break
            if (value < currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } else if (value > currentNode) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else if (value === currentNode.value) {
                //Option1 : No right child
                if (currentNode.right === null) {
                    if (parentNode === null) {
                        this.root = currentNode.left;
                    } else {
                        //if parent > currentValue, make current left child a child of parent
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.left

                            //if parent < currentValue, make current left child a right child of parent
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.left;
                        }
                    }

                    //Option2: Right child which doesn't have a left child
                } else if (currentNode.right.left === null) {
                    if (parentNode.value === null) {
                        this.root = currentNode.left
                    } else {
                        currentNode.right.left = currentNode.left;

                        //if parent > currentvalue, make right child of the left the parent
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.right;

                            //if parent < currentValue, make right child a right child of the parent
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.right
                        }
                    }

                    //Option3: Right child that has a left child
                } else {

                    //find the right child's left most child
                    let leftmost = currentNode.right.left;
                    let leftmostParent = currentNode.right;
                    while (leftmost.left !== null) {
                        leftmostParent = leftmost;
                        leftmost = leftmost.left;
                    }

                    //parent's left subtree is now leftmost's right subtree
                    leftmostParent.left = leftmost.right;
                    leftmost.left = currentNode.left;
                    leftmost.right = currentNode.right;

                    if (parentNode === null) {
                        this.root = leftmost;
                    } else {
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = leftmost;
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = leftmost;
                        }
                    }
                }
                return true;
            }
        }
    }

}

/*----------------------- example tree -----------------------*/
//          9
//      4       20
//   1    6   15   170
const bst = new BinarySearchTree();
window.onload = function () {

    //insert
    let sub0 = bst.insert(9)
    let sub11 = bst.insert(4)
    let sub12 = bst.insert(20)
    let sub24 = bst.insert(170)
    let sub22 = bst.insert(6)
    let sub21 = bst.insert(1)
    let sub23 = bst.insert(15)
    // console.log(bst)
    document.getElementById("sub-0").innerText = sub0;

    document.getElementById("sub-1-1").innerText = sub11.root.left.value;
    document.getElementById("sub-1-2").innerText = sub12.root.right.value;

    document.getElementById("sub-2-1").innerText = sub21.root.left.left.value;
    document.getElementById("sub-2-2").innerText = sub22.root.left.right.value;
    document.getElementById("sub-2-3").innerText = sub23.root.right.left.value;
    document.getElementById("sub-2-4").innerText = sub24.root.right.right.value;

    //lookup
    document.getElementById("lookup").innerText = bst.lookup(1);
    //remove
    document.getElementById("remove").innerText = bst.remove(4);
};


// bst.insert(9);
// bst.insert(4);
// bst.insert(6);
// bst.insert(20);
// bst.insert(170);
// bst.insert(15);
// bst.insert(1);
//
// console.log(JSON.stringify(traverse(bst.root)))
//
// function traverse(node) {
//     const tree = {value: node?.value};
//     traverse(node?.left)
//     tree.right = node.right === null ? null : traverse(node.right);
//
//     return tree;
// }

