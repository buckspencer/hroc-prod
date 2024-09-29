import { PortableText } from '@portabletext/react';
import CTAsSubModule, { type CTAsSubModuleType } from './CTAsSubModule';
import CustomHTMLSubmodule, { type CustomHTMLSubmoduleType } from './CustomHTMLSubmodule';
import IconSubModule, { type IconSubModuleType } from './IconSubModule';
import ImageSubModule, { type ImageSubModuleType } from './ImageSubModule';
import RichtextSubModule, { type RichtextSubModuleType } from './RichtextSubModule';
import { cn } from '@/lib/utils';
import { stegaClean } from '@sanity/client/stega';

function sanitizeString(value: string | undefined): string {
    if (!value) return '';
    // Remove zero-width characters and trim whitespace
    return value
        .replace(/[\u200B\u200C\u200D\uFEFF]/g, '') // Remove zero-width characters
        .replace(/\s+/g, ' ')                       // Replace multiple spaces with a single space
        .trim();                                    // Trim leading and trailing whitespace
}

export default function CreativeModule({
    wrapperClasses,
    modules,
    columns,
    textAlign,
    alignItems,
}: Partial<{
    wrapperClasses: string;
    modules: Partial<{
        subModules: Array<
            | CTAsSubModuleType
            | CustomHTMLSubmoduleType
            | IconSubModuleType
            | ImageSubModuleType
            | RichtextSubModuleType
        >;
        colSpan: number;
    }>[];
    columns: number;
    textAlign: React.CSSProperties['textAlign'];
    alignItems: React.CSSProperties['alignItems'];
}>) {
    const sanitizedWrapperClasses = sanitizeString(wrapperClasses);
    const imageWidth = Math.round((1200 / (modules?.length || 1)) * 1.5);

    return (
        <section className={sanitizedWrapperClasses}>
            <div className="section space-y-8">
                <div
                    className="grid items-center gap-x-12 gap-y-8 md:grid-cols-[repeat(var(--col,1),minmax(0px,1fr))]"
                    style={{
                        '--col': columns || modules?.length,
                        textAlign: stegaClean(textAlign),
                        alignItems: stegaClean(alignItems),
                    } as React.CSSProperties}
                >
                    {modules?.map(({ subModules, colSpan = 1 }, i) => (
                        <article
                            className={cn(
                                'space-y-4',
                                colSpan > 1 && 'md:col-[var(--col-span,1)]',
                            )}
                            style={{
                                '--col-span': colSpan > 1 ? `span ${colSpan}` : undefined,
                            } as React.CSSProperties}
                            key={i}
                        >
                            {subModules?.map((subModule, ii) => {
                                switch (subModule._type) {
                                    case 'ctas':
                                        return (
                                            <CTAsSubModule
                                                module={subModule}
                                                className={cn(
                                                    stegaClean(textAlign) === 'center' && 'justify-center',
                                                )}
                                                key={ii}
                                            />
                                        );

                                    case 'custom-html':
                                        return <CustomHTMLSubmodule module={subModule} key={ii} />;

                                    case 'icon':
                                        return (
                                            <IconSubModule
                                                module={subModule}
                                                className={cn(
                                                    stegaClean(textAlign) === 'center' && '[&_img]:mx-auto',
                                                )}
                                                key={ii}
                                            />
                                        );

                                    case 'image':
                                        return (
                                            <ImageSubModule
                                                module={subModule}
                                                imageWidth={imageWidth}
                                                key={ii}
                                            />
                                        );

                                    case 'richtext':
                                        return <RichtextSubModule module={subModule} key={ii} />;
                                    default:
                                        return null; // Handle unexpected submodule types
                                }
                            })}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
