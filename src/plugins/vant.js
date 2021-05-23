// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, List, Cell, Tabbar, TabbarItem, Icon, Col, Row, Calendar, IndexBar, NavBar, IndexAnchor, Search, Tag } from 'vant'

const COMPONENTS = [
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
  IndexAnchor
]

COMPONENTS.forEach(component => {
  Vue.use(component)
})
