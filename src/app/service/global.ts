export var Global = {
    // url: 'http://172.19.82.16:8081/api/',
    url: 'http://localhost:8081/api/',
    // url: 'http://172.19.82.16:8081/api/'
};

// <?xml version="1.0" encoding="utf-8"?>
// <configuration>

// <system.webServer>
//   <rewrite>
//     <rules>
//       <rule name="Angular Routes" stopProcessing="true">
//         <match url=".*" />
//         <conditions logicalGrouping="MatchAll">
//           <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
//           <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
//         </conditions>
//         <action type="Rewrite" url="/index.html" />
//       </rule>
//                 <rule name="ReverseProxyInboundRule1" stopProcessing="true">
//                     <match url="(.*)" />
//                     <action type="Rewrite" url="http://localhost:8081/api/{R:1}" />
//                 </rule>
//     </rules>
//   </rewrite>
// </system.webServer>

// </configuration>