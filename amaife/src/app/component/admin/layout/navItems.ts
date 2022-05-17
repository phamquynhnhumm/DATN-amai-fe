import {INavData} from "@coreui/angular";
import {cilSettings} from "@coreui/icons";

export const navItems: INavData[] = [
  {
    name: 'TIỆM TRÀ SỮA AMAI',
    url: '/dashboard',
    iconComponent: {name: cilSettings},
    badge: {
      color: 'info',
      text: '5sao'
    }
  },
  {
    name: 'Danh mục',
    title: true
  },
  {
    name: 'BÁN HÀNG',
    url: '/base',
    iconComponent: {name: 'cil-puzzle'},
    children: [
      {
        name: 'Đơn hàng',
        url: '/order'
      },
      {
        name: 'Chi Tiết Đơn hàng',
        url: '/orderdetail'
      }
    ]
  },
  {
    name: 'ĐỐI TÁC',
    url: '/buttons',
    iconComponent: {name: 'cil-cursor'},
    children: [
      {
        name: 'Khách hàng',
        url: '/buttons/buttons'
      },
      {
        name: 'Nhà cung cấp',
        url: '/supplier'
      }
    ]
  },
  {
    name: 'MÓN',
    url: '/forms',
    iconComponent: {name: 'cil-notes'},
    children: [
      {
        name: 'Danh mục món',
        url: '/foodcategory'
      },
      {
        name: 'Món',
        url: '/food'
      },
      {
        name: 'Nguyên liệu món',
        url: '/fooddetail'
      }
    ]
  },
  {
    name: 'QUẢN LÝ KHO',
    iconComponent: {name: 'cil-star'},
    url: '/icons',
    children: [
      {
        name: 'Phiếu nhập',
        url: '/icons/coreui-icons',
        // badge: {
        //   color: 'success',
        //   text: 'FREE'
        // }
      },
      {
        name: 'Nguyên liệu',
        url: '/material'
      },
      {
        name: 'Nhập nguyên liệu',
        url: '/icons/brands'
      }
    ]
  },
  {
    name: 'THỐNG KÊ',
    url: '/notifications',
    iconComponent: {name: 'cil-bell'},
    children: [
      {
        name: 'Thống kê đơn hàng',
        url: '/notifications/alerts'
      },
      {
        name: 'Thống kê khách hàng',
        url: '/notifications/badges'
      },
      {
        name: 'Thống kê nhà cung cấp',
        url: '/notifications/modal'
      },
      {
        name: 'Thống kê nguyên liệu',
        url: '/notifications/toasts'
      }
      ,
      {
        name: 'Thống kê thu chi',
        url: '/notifications/toasts'
      }
    ]
  },
  {
    name: 'THÙNG RÁC',
    url: '/deletefoodandcategory',
    iconComponent: {name: 'cil-bell'},
  },
];
