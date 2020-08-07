<script lang="ts">
import { shallowRef, h } from 'vue'
import routes from './utils/routes'

export default {
    setup() {
        const page = shallowRef(routes.helloWorld)

        return () => [
            h(
                'header',
                Object.keys(routes).map(name =>
                    h(
                        'button',
                        {
                            onClick: () => (page.value = routes[name])
                        },
                        name
                    )
                )
            ),
            h('section', h(page.value))
        ]
    }
}
</script>
