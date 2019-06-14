export class Period {
  type = 'Period';

  title: string;
  fields: any[] = [];

  constructor(title: string, fields: any[] = []) {
    this.title = title;
    this.fields = fields;
  }
}

export class Selector {
  type = 'Selector';
  defaultValue: string = null;

  title: string;
  options: string[] = [];

  constructor(title: string, options: string[] = []) {
    this.title = title;
    this.options = options;
  }
}

export class Checkbox {
  type = 'Checkbox';
  defaultValue: boolean = false;

  title: string;

  constructor(title: string, defaultValue?: boolean) {
    this.title = title;
    this.defaultValue = defaultValue || false;
  }
}

export class TextField {
  type = 'TextField';
  defaultValue: string = '';

  title: string;

  constructor(title: string) {
    this.title = title;
  }
}

export class NumberField {
  type = 'NumberField';
  defaultValue: number = 0;

  title: string;
  min: number;
  max: number;

  constructor(title: string, min?: number, max?: number) {
    this.title = title;
    this.min = min || 0;
    this.max = max || null;
    this.defaultValue = this.min;
  }
}

export class Textarea {
  type = 'Textarea';
  defaultValue: string = '';

  title: string;

  constructor(title: string) {
    this.title = title;
  }
}
