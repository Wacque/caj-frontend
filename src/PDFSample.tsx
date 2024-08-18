import  {useCallback, useRef, useState} from 'react';
import {useResizeObserver} from '@wojtekmaj/react-hooks';
import {pdfjs, Document, Page} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './pdf-sample.css';

import type {PDFDocumentProxy} from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = '//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';


const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

export default function Sample({viewFileBlob}: {viewFileBlob: string}) {
    const [file] = useState<PDFFile>(viewFileBlob);
    const [numPages, setNumPages] = useState<number>();
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>();
    const viewerRef = useRef<never>(null)

    const onResize = useCallback<ResizeObserverCallback>((entries) => {
        const [entry] = entries;

        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    useResizeObserver(containerRef, resizeObserverOptions, onResize);

    function onDocumentLoadSuccess({numPages: nextNumPages}: PDFDocumentProxy): void {
        console.log('onDocumentLoadSuccess', nextNumPages)
        setNumPages(nextNumPages);
    }

    function thumbnailClick(pageIndex: number) {
        if (viewerRef?.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            console.log( viewerRef?.current?.pages.current, pageIndex)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            viewerRef?.current?.pages?.current[pageIndex].scrollIntoView({
                animation: true,
            })
        }
    }

    return (
        <div className="Example">
            <header>
            </header>
            <div className="Example__container">
                <div className="Example__container__document flex justify-center" ref={setContainerRef}>
                    <div className={'fixed left-[20px] hidden md:block  top-0 z-10 bottom-0 h-[100%] overflow-scroll'}>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/*// @ts-expect-error*/}
                        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                            {/*<Thumbnail pageIndex={0} ></Thumbnail>*/}
                            <div>
                                {Array.from(new Array(numPages), (_el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        scale={0.2}
                                        onClick={() => thumbnailClick(index)}
                                    >
                                        <div className={'font-bold text-[18px] text-gray-600 w-full text-right px-[10px]'}>
                                            {index + 1}
                                        </div>
                                    </Page>
                                ))}
                            </div>
                        </Document>
                    </div>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/*// @ts-expect-error*/}
                    <Document ref={viewerRef} file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                        {/*<Thumbnail pageIndex={0} ></Thumbnail>*/}
                        {Array.from(new Array(numPages), (_el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                onClick={() => console.log(`Page ${index + 1}`)}
                                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                            />
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    );
}
