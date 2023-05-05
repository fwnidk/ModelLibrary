(self.webpackChunkmodel_library_ts=self.webpackChunkmodel_library_ts||[]).push([[6085],{16085:function(e,t,i){e=i.nmd(e),ace.define("ace/mode/haskell_cabal_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,i){"use strict";var n=e("../lib/oop"),l=e("./text_highlight_rules").TextHighlightRules,a=function(){this.$rules={start:[{token:"comment",regex:"^\\s*--.*$"},{token:["keyword"],regex:/^(\s*\w.*?)(:(?:\s+|$))/},{token:"constant.numeric",regex:/[\d_]+(?:(?:[\.\d_]*)?)/},{token:"constant.language.boolean",regex:"(?:true|false|TRUE|FALSE|True|False|yes|no)\\b"},{token:"markup.heading",regex:/^(\w.*)$/}]}};n.inherits(a,l),t.CabalHighlightRules=a})),ace.define("ace/mode/folding/haskell_cabal",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],(function(e,t,i){"use strict";var n=e("../../lib/oop"),l=e("./fold_mode").FoldMode,a=e("../../range").Range,o=t.FoldMode=function(){};n.inherits(o,l),function(){this.isHeading=function(e,t){var i=e.getTokens(t)[0];return 0==t||i&&0===i.type.lastIndexOf("markup.heading",0)},this.getFoldWidget=function(e,t,i){if(this.isHeading(e,i))return"start";if("markbeginend"===t&&!/^\s*$/.test(e.getLine(i))){for(var n=e.getLength();++i<n&&/^\s*$/.test(e.getLine(i)););if(i==n||this.isHeading(e,i))return"end"}return""},this.getFoldWidgetRange=function(e,t,i){var n=e.getLine(i).length,l=e.getLength(),o=i,s=i;if(this.isHeading(e,i)){for(;++i<l;)if(this.isHeading(e,i)){i--;break}if((s=i)>o)for(;s>o&&/^\s*$/.test(e.getLine(s));)s--;if(s>o){var r=e.getLine(s).length;return new a(o,n,s,r)}}else if("end"===this.getFoldWidget(e,t,i)){for(s=i,r=e.getLine(s).length;--i>=0&&!this.isHeading(e,i););n=e.getLine(i).length;return new a(i,n,s,r)}}}.call(o.prototype)})),ace.define("ace/mode/haskell_cabal",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/haskell_cabal_highlight_rules","ace/mode/folding/haskell_cabal"],(function(e,t,i){"use strict";var n=e("../lib/oop"),l=e("./text").Mode,a=e("./haskell_cabal_highlight_rules").CabalHighlightRules,o=e("./folding/haskell_cabal").FoldMode,s=function(){this.HighlightRules=a,this.foldingRules=new o,this.$behaviour=this.$defaultBehaviour};n.inherits(s,l),function(){this.lineCommentStart="--",this.blockComment=null,this.$id="ace/mode/haskell_cabal"}.call(s.prototype),t.Mode=s})),ace.require(["ace/mode/haskell_cabal"],(function(t){e&&(e.exports=t)}))}}]);