/**
 * GitHub URL을 파싱하여 owner와 repo 이름을 추출합니다.
 */
export function parseGitHubUrl(url: string) {
    try {
        const path = new URL(url).pathname;
        const parts = path.split("/").filter(Boolean);
        if (parts.length >= 2) {
            return { owner: parts[0], repo: parts[1] };
        }
    } catch (e) {
        return null;
    }
    return null;
}

/**
 * GitHub API를 통해 리포지토리의 README 콘텐츠를 가져옵니다.
 */
export async function fetchGitHubReadme(owner: string, repo: string) {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/readme`,
            {
                headers: {
                    Accept: "application/vnd.github.v3.raw",
                    ...(process.env.GITHUB_ACCESS_TOKEN && {
                        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
                    }),
                },
            }
        );

        if (!response.ok) return null;
        return await response.text();
    } catch (error) {
        console.error("Error fetching README:", error);
        return null;
    }
}

/**
 * GitHub API를 통해 리포지토리의 메타데이터(설명, 별점 등)를 가져옵니다.
 */
export async function fetchGitHubRepoInfo(owner: string, repo: string) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                ...(process.env.GITHUB_ACCESS_TOKEN && {
                    Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
                }),
            },
        });

        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Error fetching repo info:", error);
        return null;
    }
}
