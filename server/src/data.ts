export interface Question {
    id?: number;
    title: string;
    categories: string[];
    complexity: "Easy" | "Medium" | "Hard";
    link: string;
    description: string;
}
  
export const dummyQuestionData: Question[] = [
    {
      id: 0,
      title: "Reverse a String",
      categories: ["Strings", "Algorithms"],
      complexity: "Easy",
      link: "https://leetcode.com/problems/reverse-string/",
      description:
        "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory." +
        "Example 1:\n" +
        'Input: s = ["h","e","l","l","o"] Output: ["o","l","l","e","h"] Example 2:\n' +
        'Input: s = ["H","a","n","n","a","h"] Output: ["h","a","n","n","a","H"]\n' +
        "Constraints:\n" +
        "1 <= s.length <= 105\n" +
        "s[i] is a printable ascii character.",
    },
    {
      id: 1,
      title: "Linked List Cycle Detection",
      categories: ["Data Structures", "Algorithms"],
      complexity: "Easy",
      link: "https://leetcode.com/problems/linked-list-cycle/",
      description: "idk lol",
    },
];