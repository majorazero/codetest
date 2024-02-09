import { organizeTodos } from "../../utility/ToDo"

const generateExamples = (arr) => arr.map((element, i) => { 
    return {id: i, done: !!element} 
})

describe("ToDo Utilities", () => {
    describe("When using organizeToDos", () => {
        describe("Given item that is done", () => {
            let item = { id: "item", done: true};

            test(`Given list [0, 0, 0]`, () => {
                let example = generateExamples([0, 0, 0])
                organizeTodos(example, item);
                expect(example.length).toBe(4);
                expect(example[3].id).toBe("item");
                expect(example[2].done).toBe(false);
            });

            test(`Given list [0, 0, 0, 0, 1, 1]`, () => {
                let example = generateExamples([0, 0, 0, 0, 1, 1])
                organizeTodos(example, item);
                expect(example.length).toBe(7);
                expect(example[3].done).toBe(false);
                expect(example[4].id).toBe("item");
                expect(example[5].done).toBe(true);
            })
        
            test(`Given list []`, () => {
                let example = [];
                organizeTodos(example, item);
                expect(example.length).toBe(1);
                expect(example[0].id).toBe("item");
            });
        
        });
        describe("Given item that is not done", () => {
            let item = { id: "item", done: false};

            test(`Given list [0, 0, 0]`, () => {
                let example = generateExamples([0, 0, 0])
                organizeTodos(example, item);
                expect(example.length).toBe(4);
                expect(example[0].id).toBe("item");
                expect(example[1].done).toBe(false);
            })
        
            test(`Given list [0, 0, 0, 0, 1, 1]`, () => {
                let example = generateExamples([0, 0, 0, 0, 1, 1])
                organizeTodos(example, item);
                expect(example.length).toBe(7);
                expect(example[0].id).toBe("item");
                expect(example[1].done).toBe(false);
                expect(example[4].done).toBe(false);
                expect(example[5].done).toBe(true);
            })
        
            test(`Given list []`, () => {
                let example = [];
                organizeTodos(example, item);
                expect(example.length).toBe(1);
                expect(example[0].id).toBe("item");
            });
        });
    });
});