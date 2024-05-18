import React from 'react';

const helper = (text) => {
    return text.split('\n').map((line, index) => {
        return (
            <span key={index}>
                {line.split(' ').map((word, key) => (
                    <span key={key}>
                        {word.split('\t').map((part, idx) => (
                            <span key={idx}>
                                {idx === 0 ? part : '\t' + part}
                            </span>
                        ))}
                        {key === line.split(' ').length - 1 ? '' : ' '}
                    </span>
                ))}
                {index === text.split('\n').length - 1 ? '' : <br />}
            </span>
        );
    });
};

const processText = (text) => {
    return text.split('\n').map((line, index) => {
        if (line.startsWith("## ")) {
            return <h2 key={index}>{helper(line.slice(3))}</h2>; // Heading 2
        } else if (line.startsWith("### ")) {
            return <h3 key={index}>{helper(line.slice(4))}</h3>; // Heading 3
        } else if (line.startsWith("**")) {
            return <strong key={index}>{helper(line.slice(2))}</strong>; // Bold
        } else if (line.startsWith("__")) {
            return <u key={index}>{helper(line.slice(2))}</u>; // Underline
        } else if (line.startsWith("* ")) {
            return <li key={index}>{helper(line.slice(2))}</li>; // List item
        } else if (line.startsWith("> ")) {
            return <blockquote key={index}>{helper(line.slice(2))}</blockquote>; // Blockquote
        } else if (line.trim() === "") {
            return <br key={index} />; // Empty line
        } else {
            return <p key={index}>{helper(line)}</p>; // Default paragraph
        }
    });
};

const rulesText = () => {
    return (
        <>
            <em>{"1. Headings:"}</em> <code>{"## This is a Heading 2"}</code> <em>{"or"}</em> <code>{"### This is a Heading 3"}</code>.{'\n'}
            <em>{"2. Bold Text:"}</em> <code>{"**This is bold text**"}</code>.{'\n'}
            <em>{"3. Underline Text:"}</em> <code>{"__This is underlined text__"}</code>.{'\n'}
            <em>{"4. List Items:"}</em> <code>{"* This is a list item"}</code>.{'\n'}
            <em>{"5. Blockquotes:"}</em> <code>{"> This is a blockquote"}</code>.{'\n'}
            <em>{"6. Paragraphs:"}</em> <code>{"This is a regular paragraph."}</code>{'\n'}
            <em>{"7. Newlines:"}</em> <code>{"Use '\\n' for newlines."}</code>.{'\n'}
            <em>{"8. Spaces and Tabs:"}</em> <code>{"Spaces and tabs within a line will be preserved."}</code>.
        </>
    );
};

export { rulesText };
export default processText;


