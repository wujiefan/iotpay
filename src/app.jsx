import Taro, { Component } from '@tarojs/taro'
import { Provider,connect  } from '@tarojs/redux'
import configStore from './store'
import { setDevice } from './actions/global'

import Index from './pages/index'

import './app.less'

const store = configStore()

@connect(({ global }) => ({
  global
}),{
  setDevice,
})

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/myPoster/myPoster',
      'pages/payResult/payResult',
      'pages/ordering/ordering',
      'pages/index/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '效准',
      navigationBarTextStyle: 'black'
    }
  }
  componentWillMount(){
    let r = my.ix.getSysPropSync({key: 'ro.serialno'});
    let deviceSN = r?r.value:'zy72423105204203'
    this.props.setDevice(deviceSN)
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
