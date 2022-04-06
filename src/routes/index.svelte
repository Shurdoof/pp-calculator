<script context="module" lang="ts">
    export const prerender = true;

    export async function load() {
        return {
            status: 302,
            redirect: '/calculator'
        };
    }
</script>
