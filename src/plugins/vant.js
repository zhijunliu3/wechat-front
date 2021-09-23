// 按需全局引入 vant组件
import Vue from 'vue'
import { Uploader, Step, Steps, Picker, ActionSheet, Popup, Checkbox, Radio, Empty, Badge, Button, List, Cell, Tabbar, TabbarItem, Icon, Col, Row, Calendar, IndexBar, NavBar, IndexAnchor, Search, Tag, DropdownMenu, DropdownItem, Tab, Tabs, PullRefresh, Form, Field } from 'vant'

const COMPONENTS = [
  Uploader,
  Step,
  Steps,
  Picker,
  ActionSheet,
  Popup,
  Checkbox,
  Radio,
  Empty,
  Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  Icon,
  Col,
  Row,
  Calendar,
  IndexBar,
  NavBar,
  Search,
  Tag,
  IndexAnchor,
  DropdownItem,
  DropdownMenu,
  Tab,
  Tabs,
  PullRefresh,
  Form,
  Field,
  Badge
]

COMPONENTS.forEach(component => {
  Vue.use(component)
})
