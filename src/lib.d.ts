export type tooltipType = {
  onClick: (disabled: boolean | null) => void;
  tabindex: number;
  iconName: string;
  tooltipText: string;
};

export type areaPropaties = {
  pressed: boolean | null;
  disabled: boolean | null;
};

export type tooltipsGroupType = {
  onClick: (disabled: boolean | null) => void;
  tabindex: number;
  iconName: string;
  areaPropaties: areaPropaties;
}[];
