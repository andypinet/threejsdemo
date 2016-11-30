/**
 * 创建一个正方形墙
 * @param i
 * @param GRID                 每横排几个
 * @param CUBE_H_SIZE
 * @param CUBE_V_SIZE
 */
export function createGrid(i, GRID, CUBE_H_SIZE, CUBE_V_SIZE = CUBE_H_SIZE) {
    var x = 0, y = 0;

    if ((i % GRID) === 0) {
        col = 1;
        row++;
    } else {
        col++;
    }

    x = -(((GRID * CUBE_H_SIZE) / 2) - ((CUBE_H_SIZE) * col) + (CUBE_H_SIZE / 2));
    y = (((GRID * CUBE_V_SIZE) / 2) - ((CUBE_V_SIZE) * row) + (CUBE_V_SIZE / 2));

    return {
        x: x,
        y: y
    };
}