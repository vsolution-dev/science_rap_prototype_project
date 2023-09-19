import { Home } from "@mui/icons-material";
import { IconFlask } from "@tabler/icons-react";
import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Home",
    icon: Home,
    href: "/",
    chipColor: "secondary",
  },
  {
    navlabel: true,
    subheader: "Menu",
  },
  {
    id: uniqueId(),
    title: "실험 1",
    subtitle: "스스로 커지는 풍선",
    icon: IconFlask,
    chipColor: "secondary",
    href: "/forms/form-wizard/science-rap/self-inflating-balloon",
  },
];

export default Menuitems;
