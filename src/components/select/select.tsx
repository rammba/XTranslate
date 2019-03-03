import "./select.scss";

import * as React from "react";
import { autobind, cssNames } from "../../utils";
import { Icon } from "../icon";

const SelectContext = React.createContext(null);

export interface SelectProps<T = any> {
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: T;
  onChange?(value: T, evt: React.ChangeEvent<HTMLSelectElement>): void;
  getOptionValue?(value: T): string;
  getOptionLabel?(value: T): string;
}

export class Select extends React.Component<SelectProps> {
  static defaultProps: SelectProps = {
    getOptionValue: (value: any) => JSON.stringify(value),
    getOptionLabel: (value: any) => String(value),
  };

  public options: { [value: string]: Option } = {};

  @autobind()
  onChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    var elemValue = evt.target.value;
    var option = this.options[elemValue];
    var value = option.props.value;
    if (this.props.onChange) {
      this.props.onChange(value, evt);
    }
  }

  render() {
    var { className, value, getOptionValue, getOptionLabel, ...selectProps } = this.props;
    return (
      <div className={cssNames("Select flex", className)}>
        <SelectContext.Provider value={this}>
          <select
            {...selectProps}
            value={getOptionValue(value)}
            onChange={this.onChange}
          />
          <Icon material="keyboard_arrow_down" className="arrow-icon"/>
        </SelectContext.Provider>
      </div>
    );
  }
}

interface OptionsGroupProps extends React.HTMLProps<HTMLOptGroupElement> {
  label?: string;
  disabled?: boolean
}

export class OptionsGroup extends React.Component<OptionsGroupProps> {
  render() {
    return <optgroup {...this.props}/>
  }
}

interface OptionProps {
  value: any
  label?: string
  disabled?: boolean
}

export class Option extends React.Component<OptionProps> {
  static contextType = SelectContext;
  public context: Select;
  public elem: HTMLOptionElement;

  @autobind()
  bindRef(elem: HTMLOptionElement) {
    var { value } = this.props;
    var { getOptionValue } = this.context.props;
    this.context.options[getOptionValue(value)] = this;
    this.elem = elem;
  }

  render() {
    var { getOptionValue, getOptionLabel } = this.context.props;
    var { value, label, ...optProps } = this.props;
    if (!label) label = getOptionLabel(value);
    return (
      <option {...optProps} value={getOptionValue(value)} ref={this.bindRef}>
        {label}
      </option>
    )
  }
}