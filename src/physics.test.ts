import { Vector } from "ts-matrix";
import { BallMovement, Collision } from "./physics";


function createChecker(generator: () => Generator<Collision>) {
    let i = generator();

    return function (): Collision {
        return i.next().value;
    }
}

describe('BallMovement', () => {
    test('check basic collision', () => {
        // Return 1 collision, then null.
        let checker = createChecker(function* () {
            yield { "normal": new Vector([-1, 0]), "pos": new Vector([1, 1]) }

            return null;
        })

        let result = BallMovement.initiate(
            new Vector([0, 0]),
            new Vector([1, 1]),
            5,
            checker,
        );

        expect(result).toEqual([
            new Vector([1, 1]),
            new Vector([
                -2.585786437626905,
                4.585786437626905,
            ]),
        ]);
    });

    test('check depth limit', () => {
        // Alway return collision to make sure limit is reached.
        let checker = () => {
            return { "normal": new Vector([-1, 0]), "pos": new Vector([1, 1]) };
        }

        let result = BallMovement.initiate(
            new Vector([0, 0]),
            new Vector([1, 1]),
            1000,
            checker,
        );
        
        expect(result.length).toBe(50);
    })
});
