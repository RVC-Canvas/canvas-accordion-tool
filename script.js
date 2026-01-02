"use strict";
$(document).ready(function () {

    let sectionCount = 0;

    function formatContent(rawText) {
        const hasHtml = /<[a-z][\s\S]*>/i.test(rawText);

        if (hasHtml) {
            return rawText;
        }

        const escaped = rawText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        const withBreaks = escaped.replace(/\n/g, "<br>");

        return `<p>${withBreaks}</p>`;
    }

    function addSection() {
        sectionCount++;

        $('#sections').append(`
            <div class="card mb-3 section">
                <div class="card-body">

                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <strong>Section ${sectionCount}</strong>
                        <button type="button"
                                class="btn btn-danger btn-md removeSection">
                            Remove
                        </button>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold">Accordion Title</label>
                        <input type="text"
                               class="form-control sectionTitle"
                               placeholder="Enter accordion title">
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label class="form-label fw-bold">Emoji</label>
                            <select class="form-select sectionEmoji">
                                <option value="">None</option>

                                <optgroup label="General">
                                    <option value="📘">📘 Overview</option>
                                    <option value="📌">📌 Important</option>
                                    <option value="🧭">🧭 Guide</option>
                                    <option value="📖">📖 Reading</option>
                                    <option value="🗂️">🗂️ Organization</option>
                                </optgroup>

                                <optgroup label="Assignments & Assessment">
                                    <option value="📝">📝 Assignment</option>
                                    <option value="📄">📄 Worksheet</option>
                                    <option value="🧪">🧪 Lab</option>
                                    <option value="📊">📊 Project</option>
                                    <option value="✅">✅ Checklist</option>
                                    <option value="🧠">🧠 Quiz</option>
                                    <option value="🎯">🎯 Objectives</option>
                                </optgroup>

                                <optgroup label="Time & Planning">
                                    <option value="📅">📅 Schedule</option>
                                    <option value="⏰">⏰ Deadline</option>
                                    <option value="🕒">🕒 Time</option>
                                    <option value="📆">📆 Calendar</option>
                                </optgroup>

                                <optgroup label="Resources & Links">
                                    <option value="📂">📂 Resources</option>
                                    <option value="🔗">🔗 Links</option>
                                    <option value="🌐">🌐 Website</option>
                                    <option value="🎥">🎥 Video</option>
                                    <option value="🎧">🎧 Audio</option>
                                    <option value="💾">💾 Download</option>
                                </optgroup>

                                <optgroup label="Communication & Support">
                                    <option value="❓">❓ Questions</option>
                                    <option value="💬">💬 Discussion</option>
                                    <option value="📣">📣 Announcement</option>
                                    <option value="✉️">✉️ Message</option>
                                    <option value="🤝">🤝 Support</option>
                                </optgroup>

                                <optgroup label="Tips & Warnings">
                                    <option value="💡">💡 Tip</option>
                                    <option value="⚠️">⚠️ Warning</option>
                                    <option value="🚨">🚨 Alert</option>
                                    <option value="🔍">🔍 Review</option>
                                </optgroup>

                                <optgroup label="Progress & Completion">
                                    <option value="🏁">🏁 Start Here</option>
                                    <option value="📈">📈 Progress</option>
                                    <option value="🏆">🏆 Achievement</option>
                                    <option value="🎉">🎉 Completion</option>
                                </optgroup>
                            </select>
                        </div>

                        <div class="col-md-4">
                            <div class="form-check mt-4">
                                <input class="form-check-input sectionBold"
                                       type="checkbox"
                                       checked>
                                <label class="form-check-label">
                                    Bold title
                                </label>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label fw-bold">
                                Title Font Size
                            </label>
                            <select class="form-select sectionFontSize">
                                <option value="0.8em">Small</option>
                                <option value="1.0em" selected>Medium</option>
                                <option value="1.5em">Large</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold">
                            Accordion Content (HTML allowed)
                        </label>
                        <textarea class="form-control sectionContent"
                                  rows="4" placeholder="Enter content..."></textarea>
                    </div>

                </div>
            </div>
        `);
    }

    addSection();

    $('#addSection').on('click', addSection);

    $(document).on('click', '.removeSection', function () {
        $(this).closest('.section').remove();
    });

    $('#generateHtml').on('click', function () {

        const bgColor = $('#bgColor').val();
        const textColor = $('#textColor').val();

        let output = `

<div style="max-width:100%; border:1px solid #ccc; border-radius:4px;">
        `.trim();

        $('.section').each(function (index) {

            const title =
                $(this).find('.sectionTitle').val() ||
                `Accordion Item ${index + 1}`;

            const emoji =
                $(this).find('.sectionEmoji').val();

            const rawContent =
                $(this).find('.sectionContent').val();

            const content =
                formatContent(rawContent);

            const fontSize =
                $(this).find('.sectionFontSize').val();

            const fullTitle =
                emoji ? `${emoji} ${title}` : title;

            const outputTitle =
                $(this).find('.sectionBold').is(':checked')
                    ? `<strong>${fullTitle}</strong>`
                    : `${fullTitle}`;
            output += `

    <details>
        <summary
            role="button"
            aria-expanded="false"
            style="
                background-color:${bgColor};
                color:${textColor};
                padding:12px;
                font-size:${fontSize};
                cursor:pointer;
                border-bottom:1px solid #ccc;
                outline:none;
            ">
            ${outputTitle}
        </summary>

        <div
            role="region"
            aria-label="${title}"
            style="
                padding:15px;
                background-color:#ffffff;
                color:#000000;
                line-height:1.6;
            ">
            ${content}
        </div>
    </details>`;
        });

        output += `
</div>
<!-- End Canvas Accordion -->
        `.trim();

        $('#outputHtml').val(output);
    });

});