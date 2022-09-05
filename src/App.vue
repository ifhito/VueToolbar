<script setup lang="ts">
  import { text } from '@fortawesome/fontawesome-svg-core';
  import { ref } from 'vue'
  import Button from './components/Atoms/Button.vue';
  import ToolTipsGroup from './components/Molecules/ToolTipsGroup.vue';
  import ToolBar from './components/Organisms/ToolBar.vue';
  import "./lib.d.ts";
  defineProps<{ msg: string }>()
  
  const count = ref(0)
  const func = ref(()=>{alert("click")})
  const select = ref()
  const selected = ref(()=> {select.value = window.getSelection()})
  
  // TODO: spanでboldした後の続きの文章は普通の文字にしたい。
  const changeStyleFunc = (style:string) => {
    console.log(select.value)
    if(!select.value?.rangeCount) return;
    const range = select.value.getRangeAt(0);
    const newNode = document.createElement('span');
    newNode.setAttribute('style', style);
    // 文字の周りにspanを追加
    range.surroundContents(newNode)
    //続きの文章が太文字にならないようにCaret位置を変更する
    const textarea = document.getElementById("textarea-sent");
    // 空白を最後の子要素に入れる
    const txt = document.createTextNode("\u00a0");
    textarea?.appendChild(txt);
    textarea?.focus()
    const r = document.createRange()
    r.setStart(textarea, textarea?.childNodes.length);
    r.setEnd(textarea, textarea?.childNodes.length);
    select.value.removeAllRanges();
    select.value.addRange(r);
  }
  
  // TODO:クリップボードへのペースト
  const CPCFunc = async (event) => {
    switch(event){
      case "cut":
        if (navigator.clipboard && !select.value.toString() == false) {
          await navigator.clipboard.writeText(select.value.toString());
          select.value.deleteFromDocument();
        } else {
          alert("clipboardAPIに対応していません");
        }
        break;
      case "copy":
        if (navigator.clipboard && !select.value.toString() == false) {
          await navigator.clipboard.writeText(select.value.toString());
        } else {
          alert("clipboardAPIに対応していません");
        }
        break
      case "paste":
        if (navigator.clipboard) {
          const target = document.getElementById("textarea-sent");
          await navigator.clipboard.readText().then((text)=>{
            if (!select.value || !select.value.rangeCount) throw new Error("何かおかしい");
            select.value.deleteFromDocument();
            select.value.getRangeAt(0).insertNode(document.createTextNode(text));
          });
        } else {
          alert("clipboardAPIに対応していません");
        }
    }
  }
  const tooltipsListOfFixStyle = [
    {
      iconName: "coffee",
      tabindex: 0,
      onClick: ()=>changeStyleFunc("font-weight: bold;")
    },
    {
      iconName: "coffee",
      tabindex: -1,
      onClick: ()=>changeStyleFunc("color: blue;")
    }
  ]
  const tooltipsListOfCCP = [
    {
      iconName: "coffee",
      tabindex: -1,
      onClick: ()=>CPCFunc("copy")
    },
    {
      iconName: "coffee",
      tabindex: -1,
      onClick: ()=>CPCFunc("cut")
    },
    {
      iconName: "coffee",
      tabindex: -1,
      onClick: ()=>CPCFunc("paste")
    }
  ]
  const toolBarList = [
    {
      GroupName: "FixStyle",
      tooltipsGroupList: tooltipsListOfFixStyle
    },
    {
      GroupName: "CopyAndPasteAndCut",
      tooltipsGroupList: tooltipsListOfCCP
    }
  ]
  </script>
  
  <template>
    <ToolBar :tool-bar-list="toolBarList"/>
    <div
    role="textarea"
    @select="selected"
    @blur="selected"
    @keyup="selected"
    @click="selected"
    name="sentence"
    id="textarea-sent"
    cols="30"
    rows="10"
    contenteditable="true">
    </div>
  </template>
  
  <style scoped>
    #textarea-sent {
      width: 600px;
      background-color: aquamarine;
      color: black;
    }
  </style>
  