import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title') || 'Tucode Pamoja';
        const description = searchParams.get('description') || 'Code Together, Vibe Forever';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#050508',
                        color: 'white',
                        fontFamily: 'sans-serif',
                        position: 'relative',
                    }}
                >
                    {/* Background Gradient */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-30%',
                            left: '-10%',
                            width: '150%',
                            height: '150%',
                            background: 'radial-gradient(circle, rgba(255,113,62,0.1) 0%, rgba(5,5,8,0) 70%)',
                            filter: 'blur(100px)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-30%',
                            right: '-10%',
                            width: '120%',
                            height: '120%',
                            background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(5,5,8,0) 70%)',
                            filter: 'blur(100px)',
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            textAlign: 'center',
                            padding: '0 40px',
                        }}
                    >
                        {/* Logo text simulation */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                            <div style={{ fontSize: 60, fontWeight: 900, background: 'linear-gradient(to right, #fff, #888)', backgroundClip: 'text', color: 'transparent' }}>
                                TUCODE
                            </div>
                            <div style={{ fontSize: 60, fontWeight: 900, background: 'linear-gradient(to right, #ff713e, #d946ef)', backgroundClip: 'text', color: 'transparent' }}>
                                PAMOJA
                            </div>
                        </div>

                        <div
                            style={{
                                fontSize: 80,
                                fontWeight: 'heavy',
                                background: 'linear-gradient(to bottom, #fff, #888)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                lineHeight: 1.1,
                                marginBottom: '40px',
                                maxWidth: '900px',
                                whiteSpace: 'pre-wrap',
                                textShadow: '0 0 40px rgba(255,255,255,0.2)'
                            }}
                        >
                            {title}
                        </div>

                        <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.6)', maxWidth: '800px' }}>
                            {description}
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
