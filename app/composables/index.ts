import type { UseFetchOptions } from "#app"
import type { IContact, TurnstileScript } from "~/../typing"

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

export const useAboutData = async (lang: string) => {
    const response = await $fetch('/api/about/get', {
        method: 'POST',
        body: { code: lang },
    });
    if (response && response.statusCode === 200) {
        const data = response.result;
        return data;
    }
    return {
        name: 'Your name',
        position: 'Your Position',
        description: 'Something about you',
        skills: ['Comma', 'Separated', 'Skills'],
        skillsSecondary: ['Comma', 'Separated', 'Skills'],
    };
}
export async function useResumeData() {
    const response = await $fetch('/api/resume/get', {
        method: 'POST',
    });
    if (response && response.success) {
        const data = response.result;
        return data
    }
}
export const useContactsData = async (): Promise<IContact[]> => {
    const response = await $fetch('/api/contacts/get', {
        method: 'POST',
    });
    if (response && response.statusCode === 200) {
        const data = response.result;
        return data as IContact[];
    }
    return [];
}

export const useProjectsData = async () => {
    const response = await $fetch('/api/project/get', {
        method: 'POST',
    });
    if (response && response.statusCode === 200) {
        const data = response.result;
        return data;
    }
    return [];
}

export const useSkillsData = async () => {
    const response = await $fetch('/api/skills/get', {
        method: 'POST',
    });
    if (response && response.statusCode === 200) {
        const data = response.result;
        return data as unknown as {
            _id: string,
            icon: { name: string, color: string },
            name: string,
            skills: { icon: { name: string, color: string }, name: string }[]
        }[];
    }
    return [];
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