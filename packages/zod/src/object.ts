type ParseInput = unknown;

export abstract class ZodType<Output = unknown> {
  readonly _type!: Output;

  abstract parse(input: ParseInput): Output;

  // abstract safeParse(
  //   input: ParseInput,
  // ): { success: true; data: Output } | { success: false; error: Error };
}

export class ZodString extends ZodType<string> {
  parse(input: unknown) {
    if (typeof input === "string") {
      return input;
    }
    throw Error("Expected input to be a string");
  }

  // safeParse(
  //   input: unknown,
  // ): { success: false; error: Error } | { success: true; data: string } {
  //   if (typeof input === "string") {
  //     return { success: true, data: input };
  //   } else {
  //     return { error: new Error("Expected input to be a string"), success: false };
  //   }
  // }
}

export class ZodObject<
  T extends Record<string, ZodType<unknown>>,
> extends ZodType<T> {
  constructor(private schema: T) {
    super();
  }

  parse(input: unknown): Record<string, unknown> {
    if (typeof input !== "object") {
      throw Error("Expected input to be an object");
    }

    let validatedData = {} as Record<string, unknown>;

    for (const key in this.schema) {
      const validator = this.schema[key];
      const result = validator?.parse(input[key]);
      validatedData[key] = result;
    }

    return validatedData;
  }
  //
  // safeParse(
  //   input: unknown,
  // ): { success: false; error: Error } | { success: true; data: string } {
  //   if (typeof input === "string") {
  //     return { success: true, data: input };
  //   } else {
  //     return { error: new Error("Expected input to be a string"), success: false };
  //   }
  // }
}
