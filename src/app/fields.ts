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
  defaultValue: string = null;

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
  defaultValue: string = '';

  constructor(title: string) {
    this.title = title;
  }
}

export class NumberField {
  title: string;
  min: number;
  max: number;
  defaultValue: number = 0;

  constructor(title: string, min?: number, max?: number) {
    this.title = title;
    this.min = min || 0;
    this.max = max || null;
    this.defaultValue = this.min;
  }
}

export class Textarea {
  title: string;
  defaultValue: string = '';

  constructor(title: string) {
    this.title = title;
  }
}
