import { multi, sum } from '@/lib/operations';

describe('Operaciones', () => {
    it('suma números', () => {
        expect(sum(2, 3)).toBe(5);
    });

    it('maneja negativos', () => {
        expect(sum(-2, 3)).toBe(1);
    });


    it('operacion Multiplicacion', () => {
        expect(multi(2, 3)).toBe(6);
    });


});