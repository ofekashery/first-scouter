export class Period {
  title: string;
  fields: any[] = [];

  constructor(title: string, fields: any[] = []) {
    this.title = title;
    this.fields = fields;
  }
}

export class Selector {
  title: string;
  options: string[] = [];

  constructor(title: string, options: string[] = []) {
    this.title = title;
    this.options = options;
  }
}

export class Checkbox {
  title: string;
  defaultValue: boolean = false;

  constructor(title: string, defaultValue?: boolean) {
    this.title = title;
    this.defaultValue = defaultValue || false;
  }
}

export class TextField {
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}

export class NumberField {
  title: string;
  min: number;
  max: number;

  constructor(title: string, min?: number, max?: number) {
    this.title = title;
    this.min = min || null;
    this.max = max || null;
  }
}

export class Textarea {
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}
