<script lang="ts">
    import ThemeToggle from '$components/theme/ThemeToggle.svelte';
    import {faXmark} from '@fortawesome/free-solid-svg-icons';
    import {exit} from '@tauri-apps/api/process';
    import Fa from 'svelte-fa';

    Fa;
</script>

<div class="flex h-20 items-center justify-between px-4" data-tauri-drag-region>
    <nav>
        <ul class="flex gap-x-8 text-3xl font-bold [&_a:hover]:text-primary [&_a]:transition-colors">
            <li>
                <a href="/route1"> Route1 </a>
            </li>
            <li>
                <a href="/route2"> Route2 </a>
            </li>
        </ul>
    </nav>

    <div class="[&>*:hover]:text-primary flex items-center space-x-4 [&>*]:transition-all [&>*]:duration-300">
        <ThemeToggle/>
        <button class="p-4" on:click={() => exit(0)}>
            <Fa icon={faXmark} size="1.5x"/>
        </button>
    </div>
</div>
