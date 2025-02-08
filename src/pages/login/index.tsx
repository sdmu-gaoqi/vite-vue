import { loginService } from '@/services/user'
import { systemLogin } from '@/utils'
import { Button, Form, Input } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const Login = defineComponent({
  name: 'Login',
  setup() {
    const route = useRouter()
    const formState = reactive({
      account: 'admin',
      password: '123456'
    })

    const login = async () => {
      const res = await loginService()
      systemLogin(res?.data?.token)
      route.push({ path: '/workbench' })
    }

    return () => (
      <div class="wh-100 flex">
        <Form class="w-[500px] h-[100%] !m-auto bg-white rounded-[10px] !px-[50px] !py-[20px]">
          <Form.Item name="account" label="账号">
            <Input v-model={[formState.account, 'value']}></Input>
          </Form.Item>
          <Form.Item name="password" label="密码">
            <Input.Password
              v-model={[formState.password, 'value']}
            ></Input.Password>
          </Form.Item>
          <Button onClick={login}>提交</Button>
        </Form>
      </div>
    )
  }
})

export default Login
