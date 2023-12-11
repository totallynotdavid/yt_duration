const { getVideoLength } = require("../src/index");

describe("getVideoLength", () => {
  it("debe de retornar la duración correcta en segundos del video con ID in8JE5E4NFI", async () => {
    const duration = await getVideoLength("in8JE5E4NFI");
    expect(duration).toBe(3630);
  });

  it("debe de retornar la duración correcta en minutos del video con ID 8JE5E4NFI", async () => {
    const duration = await getVideoLength("in8JE5E4NFI", "minutes");
    expect(duration).toBeCloseTo(60.5);
  });

  it("debe de retornar la duración correcta en horas del video con ID 8JE5E4NFI", async () => {
    const duration = await getVideoLength("in8JE5E4NFI", "hours");
    expect(duration).toBeCloseTo(1.00805);
  });
});
