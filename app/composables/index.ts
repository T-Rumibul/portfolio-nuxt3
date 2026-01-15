import type { UseFetchOptions } from "#app"
import type { IContact, IProject, IResume, ISkillCategory, TurnstileScript } from "~/../typing"
export const useResumeState = () => {
    const state = useState<IResume | null>('resumeData', () => null);
    if (!state.value) {
        $fetch('/api/resume/get', {
            method: 'POST',
        }).then((response) => {
            if (response && response.success) {
                const data = response.result;
                state.value = data;
            }
        });

    }
    return state;
}
export const useProjectsState = () => {
    const state = useState<IProject[] | null>('projectsData', () => null);
    if (!state.value) {
        $fetch('/api/project/get', {
        method: 'POST',
    }).then((response) => {
            if (response && response.success) {
                const data = response.result;
                state.value = data;
            }
        });

    }
    return state;
}

export const useTurnstileScript = () => {
    return useScript(
        {
            src: useRuntimeConfig().public.turnstileScript,

        },
        {
            use() {
                return { turnstile: (window as any).turnstile as TurnstileScript }
            },
            warmupStrategy: 'preload',
            trigger: 'client'
        })
}



export function useAdminAPI<T>(
    url: string | (() => string),
    options?: UseFetchOptions<T>,
) {
    return useFetch(`/api/admin${url}`, {
        ...options,
        $fetch: useNuxtApp().$adminAPI as typeof $fetch,
    })
}